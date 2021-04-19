const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    uniqueValidator = require('mongoose-unique-validator'),
    bcrypt = require('bcrypt')

const UserSchema = new Schema({

    username: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true },

    //Our password is hashed with bcrypt
    password: { type: String, required: true },

    captainUpId: String,
    profile: {
        firstName: String,
        lastName: String,
        avatar: String,
    },

    role: { type: String, required: true, default: 'user', enum: ['user', 'admin'] },

    isActive: { type: Boolean, default: true }

}, {
    timestamps: true
});

UserSchema.plugin(uniqueValidator, { message: 'is already taken.' });

/** Password encryption. */
UserSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);

    next();
});

UserSchema.methods.comparePassword = function (plaintext, callback) {
    return callback(null, bcrypt.compareSync(plaintext, this.password));
};

module.exports = mongoose.model("User", UserSchema);

// TODO
// captainUpData: {

//     // נקודות
//     points: Number,

//         // דרגה
//         level: String,

//             // תגים
//             badges: { type: [] },

//     // משימות
//     // ?
//     actions: { type: [] },

//     // הכשרות
//     // ?
//     // גילי

// },
// }

// OBSELETE
/** Captainup username encryption. */
// UserSchema.pre("save", function (next) {

//     if (this.captainUpEncryptedUsername) return;

//     let encUsernameObj = encrypt(this.username);
//     this.captainUpEncryptedUsername = encUsernameObj.encryptedData;

//     let test = decrypt(this.captainUpEncryptedUsername);

//     next();
// })