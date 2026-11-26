"use strict";

// Muse classic BLE service and AF7 EEG channel. Protocol reference:
// https://github.com/urish/muse-js/blob/master/src/muse.ts
const museService = 0xfe8d;
const museControl = "273e0001-4c4d-454d-96be-f03bac821358";
const museAf7 = "273e0004-4c4d-454d-96be-f03bac821358";

function decodeMusePacket(data) {
  if (!data || data.byteLength !== 20) return [];
  const samples = [];
  for (let index=2; index<data.byteLength; index+=3) {
    const first = data.getUint8(index);
    const middle = data.getUint8(index+1);
    const last = data.getUint8(index+2);
    samples.push(((first*16 + (middle>>4))-2048)*0.48828125);
    samples.push((((middle&15)*256 + last)-2048)*0.48828125);
  }
  return samples;
}

async function connectMuse(onSamples,onDisconnect) {
  const device = await navigator.bluetooth.requestDevice({filters:[{services:[museService]}]});
  let gatt;
  let eeg;
  function onReading(event) {
    const samples = decodeMusePacket(event.target.value);
    if (samples.length) onSamples(samples);
  }
  function onLoss() {
    eeg?.removeEventListener("characteristicvaluechanged",onReading);
    onDisconnect();
  }
  try {
    gatt = await device.gatt.connect();
    device.addEventListener("gattserverdisconnected",onLoss,{once:true});
    const service = await gatt.getPrimaryService(museService);
    const control = await service.getCharacteristic(museControl);
    eeg = await service.getCharacteristic(museAf7);
    eeg.addEventListener("characteristicvaluechanged",onReading);
    await eeg.startNotifications();
    for (const command of ["h","p21","s","d"]) {
      const bytes = Uint8Array.from([command.length+1,...Array.from(command,char=>char.charCodeAt(0)),10]);
      if (control.properties?.writeWithoutResponse && control.writeValueWithoutResponse) {
        await control.writeValueWithoutResponse(bytes);
      } else if (control.writeValueWithResponse) {
        await control.writeValueWithResponse(bytes);
      } else {
        await control.writeValue(bytes);
      }
    }
    if (!gatt.connected) throw new Error("Headset disconnected");
    return {
      disconnect() {
        device.removeEventListener("gattserverdisconnected",onLoss);
        eeg.removeEventListener("characteristicvaluechanged",onReading);
        if (gatt.connected) gatt.disconnect();
      }
    };
  } catch (error) {
    device.removeEventListener("gattserverdisconnected",onLoss);
    eeg?.removeEventListener("characteristicvaluechanged",onReading);
    if (gatt?.connected) gatt.disconnect();
    throw error;
  }
}
