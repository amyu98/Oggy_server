const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// WIP
// AKA action
const TaskSchema = new Schema({

    name: String,
    files: [],
    points: Number,
    textContent: String

}, {
    timestamps: true
});

// TaskSchema.virtual("name", () => {
//     return this._id.toString();
// })

module.exports = mongoose.model("Task", TaskSchema);