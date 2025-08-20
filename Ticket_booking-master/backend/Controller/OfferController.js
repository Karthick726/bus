const Offer =require("../Schema/OfferSchema")
const cloundinary = require("../cloundinary/cloudinary");
const upload = require("../cloundinary/upload");

exports.addOffer = async (req, res) => {
  try {
    const { startDate, endDate, description } = req.body;
    const image = req.files["image"][0];

    if (!image) {
      return res.status(400).json({ error: "Image is required" });
    }

    async function processImage(imageBuffer, maxSizeKB) {
      const imageString = imageBuffer.toString("base64");

      const result = await cloundinary.uploader.upload(
        `data:image/jpeg;base64,${imageString}`,
        {
          folder: "offer-Images",
          resource_type: "image",
        }
      );

      return result.secure_url;
    }
    const image_url = await processImage(image.buffer, 1000);

    const newOffer = new Offer({
      startDate,
      endDate,
      description,
      image: image_url,
    });

    await newOffer.save();

    res.status(200).json({
      message: "Offer added successfully",
      offer: newOffer,
    });
  } catch (error) {
    console.error("Add Offer Error:", error);
    res.status(500).json({ error: "Server error while adding offer" });
  }
};

exports.getOffers = async (req, res) => {
  try {
    const offers = await Offer.find();
    res.status(200).json(offers);
  } catch (error) {
    console.error("Get Offers Error:", error);
    res.status(500).json({ error: "Server error while fetching offers" });
  }
};

exports.deleteOffers=async(req,res)=>{
     try {
    const { id } = req.body;
    const offer = await Offer.findByIdAndDelete(id);

    if (!offer) {
      return res.status(404).json({ error: "Offer not found" });
    }

    res.status(200).json({ message: "Offer deleted successfully" });
  } catch (error) {
    console.error("Delete Offer Error:", error);
    res.status(500).json({ error: "Server error while deleting offer" });
  }
}
