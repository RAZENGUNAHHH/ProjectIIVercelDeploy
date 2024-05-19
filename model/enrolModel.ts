import { Schema, model, models } from "mongoose";

const enrolSchema = new Schema(
  {
    id_user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    id_course: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    name : { 
      type : String,
      require : true
    },
    certificate : {   
      type : Boolean,
      require : true,
      default : false
    }
   
  },
  { timestamps: true }
);

const enrolModel = models.enrol || model("enrol", enrolSchema);

export default enrolModel;
