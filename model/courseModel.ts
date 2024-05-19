import { Schema, model, models } from "mongoose";

const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    st_date: {
      type: Date,
      required: true,
    },
    en_date: {
      type: Date,
      required: true,
    },
    instructor: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
    st_enrol: {
      type: Date,
      required: true,
    },
    en_enrol: {
      type: Date,
      required: true,
    },
    limited: {
      type: Number,
      default: 999,
    },
    img_src: {
      type: String,
      required: true,
    },
    category : {
      type : String,
      require : true,
    }
   
  },
  { timestamps: true }
);

const courserModel = models.course || model("course", courseSchema);

export default courserModel;
