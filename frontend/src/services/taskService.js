import axios from "axios";

export async function processVoice(audioBlob) {
  const formData = new FormData();
  formData.append("audio", audioBlob);

  const res = await axios.post("/api/voice", formData);
  return res.data.tasks;
}
