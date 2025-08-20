const FestivalInfo = require("../Schema/InfoSchema");

exports.addFestivalInfo = async (req, res) => {
  try {
    const { date, placeInfo } = req.body;

    if (!date || !Array.isArray(placeInfo)) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const findDate = await FestivalInfo.findOne({ date });

    console.log(findDate);

    if (findDate) {
      return res.status(400).json({ message: "Date already in info" });
    }

    const newFestival = new FestivalInfo({
      date,
      placeInfo,
    });

    await newFestival.save();

    return res.status(200).json({
      message: "Festival info added successfully",
      data: newFestival,
    });
  } catch (error) {
    console.error("Error adding festival info:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getFestivalInfo = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        message: "Date is required",
      });
    }
    const getFestivalInfo = await FestivalInfo.findOne({ date });

    res.status(200).json({
      festivalInfo: getFestivalInfo,
    });
  } catch (err) {
    console.error("Error adding festival info:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getAllInfo=async(req,res)=>{
   try {
   
    const getFestivalInfo = await FestivalInfo.find();

    res.status(200).json({
      festivalInfo: getFestivalInfo,
    });
  } catch (err) {
    console.error("Error adding festival info:", error);
    return res.status(500).json({ message: "Server error" });
  }
}



exports.deleteInfo = async (req, res) => {
  try {
    const { id } = req.body;
    const infoDelete = await FestivalInfo.findByIdAndDelete(id);
    res.status(200).json({ message: "Info Deleted Successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updateFestivalInfo = async (req, res) => {
  try {
    const {id, date, placeInfo } = req.body;


    if (!date || !Array.isArray(placeInfo) || !id) {
      return res.status(400).json({ message: "Invalid input" });
    }

    console.log(id)

 
const updateInfo=await FestivalInfo.findByIdAndUpdate(id,{
  date,
  placeInfo
},{
  new:true
})
 

  

    return res.status(200).json({
      message: "Festival info update successfully",
    });
  } catch (error) {
    console.error("Error update festival info:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
