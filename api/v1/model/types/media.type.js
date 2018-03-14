module.exports = {
  type: {type: String, trim: true, enum: ['file', 'link']},
  format: {type: String, trim: true, enum: ['jpg', 'jpeg', 'bmp', 'png', 'svg', 'mp4', 'mkv', 'flv', 'avi', 'avi', 'gif']},
  url: {type: String, trim: true}
};