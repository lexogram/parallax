const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlacementSchema = new Schema({
  x: { type: Number, required: true },
  y: { type: Number },
  z: { type: Number, required: true },
  behaviorGroup_id: { type: String },
  _id: false
});

const ImageSchema = new Schema({
  url: { type: String, required: true },
  placements: { type: [PlacementSchema], required: true },
  _id: false
});

const BackgroundAudioSectionSchema = new Schema({
  start_time: { type: String, required: true },
  end_time: { type: String, required: true },
  start_scroll: { type: Number, required: true },
  end_scroll: { type: Number, required: true },
  envelope: { type: String },
  triggers: { type: [String] },
  _id: false
});

const BackgroundAudioSchema = new Schema({
  url: { type: String, required: true },
  sections: { type: [BackgroundAudioSectionSchema], required: true },
  _id: false
});

const SFXClipSchema = new Schema({
  start_time: { type: String, required: true },
  end_time: { type: String, required: true },
  _id: false
});

const SFXSchema = new Schema({
  url: { type: String, required: true },
  clips: { type: Map, of: SFXClipSchema, required: true },
  _id: false
});

const AudioChunkSchema = new Schema({
  word: { type: String, required: true },
  start_time: { type: String, required: true },
  end_time: { type: String, required: true },
  _id: false
});

const AudioTimingSchema = new Schema({
  start_time: { type: String, required: true },
  end_time: { type: String, required: true },
  words: { type: [AudioChunkSchema], required: true },
  _id: false
});

const ReaderSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  timing: { type: Map, of: AudioTimingSchema },
  _id: false
});

const WordSchema = new Schema({
  url: { type: String, required: true },
  timing: { type: Map, of: AudioTimingSchema },
  _id: false
});

const AudioSchema = new Schema({
  background: { type: [BackgroundAudioSchema] },
  sfx: { type: SFXSchema },
  reader: { type: Map, of: { type: Map, of: ReaderSchema } },
  words: { type: Map, of: { type: Map, of: WordSchema } },
  _id: false
});

const SectionSchema = new Schema({
  position: { type: Number, required: true },
  text: { type: Map, of: String, required: true},
  _id: false
});

const SequenceSchema = new Schema({
  storyId: { type: String, required: true },
  index: { type: Number, required: true },
  creation_date: { type: Date, required: true },
  modification_date: { type: Date, required: true },
  images: { type: [ImageSchema], required: true },
  audio: { type: AudioSchema, required: true },
  scripts: { type: Map, of: String },
  portals: { type: Map, of: String },
  behaviors: { type: Map, of: { type: Map, of: Map } },
  sections: { type: Map, of: SectionSchema, required: true }
});

const SequenceModel = mongoose.model("Sequence", SequenceSchema);

module.exports = SequenceModel
