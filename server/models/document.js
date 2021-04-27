import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import Inc from "mongoose-sequence";  
const AutoIncrement = Inc(mongoose);

let documentSchema = new Schema(
  {
    document_id: { type: Number, default: 0 },
    description: { type: String },
    fileLink: { type: String },
    likes: { type: [String], default: [] },
    creator: String,
    s3_key: { type: String }
  },
  {
    // createdAt,updatedAt fields are automatically added into records
    timestamps: true
  }
);

documentSchema.plugin(AutoIncrement, { inc_field: "document_id" });

export default mongoose.model("Document", documentSchema);
