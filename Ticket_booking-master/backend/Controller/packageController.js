const package = require("../Schema/package");
const cloudinary = require("../cloundinary/cloudinary");
const upload = require("../cloundinary/upload");

exports.addPackage = async (req, res) => {
  try {
    const {
      packageName,
      description,
      packageDay,
      startTime,
      endTime,
      source,
      destination,
      price,
    } = req.body;

    if (!req.body) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const places = [];
    const files = req.files;
    const placeArray = req.body.place;

    for (let i = 0; i < placeArray.length; i++) {
      const place = placeArray[i];
      const file = files.find((f) => f.fieldname === `place[${i}][image]`);

      let uploadedUrl = "";
      if (file) {
        const base64Image = `data:${
          file.mimetype
        };base64,${file.buffer.toString("base64")}`;
        const uploadResult = await cloudinary.uploader.upload(base64Image, {
          folder: "Products",
          resource_type: "image",
        });
        uploadedUrl = uploadResult.secure_url;
      }

      places.push({
        value: place.value,
        image: uploadedUrl,
      });
    }

    const newPackage = new package({
      packageName,
      price,
      destination,
      source,
      description,
      packageDay,
      startTime,
      endTime,
      Place: places,
    });

    await newPackage.save();
    res.status(200).json({ message: "package Added Successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getPackage = async (req, res) => {
  try {
    const packages = await package.find();

    res.status(200).json(packages);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.deletePackage = async (req, res) => {
  try {
    const { id } = req.body;
    const packageDelete = await package.findByIdAndDelete(id);
    res.status(200).json({ message: "Vacation Deleted Successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};



exports.updateVacation = async (req, res) => {
  try {
    const {
      id,
      source,
      destination,
            description,
      packageDay,
      startTime,
      endTime,
      packagaName,
      price
     
    } = req.body;

    console.log(req.body)

    if (!req.body) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    const vacationsUpdate = await package.findByIdAndUpdate(id, {
      price,
      source,
      destination,
      description,
      startTime,
      endTime,
      packageDay,
    packagaName
    },{
      new: true
    }
  )


  console.log(vacationsUpdate)

    res.status(200).json({ message: "package update Successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
