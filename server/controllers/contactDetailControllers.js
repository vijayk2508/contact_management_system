const ContactDetailModel = require("../model/contactDetailModel");
// Create a new contact detail
exports.createContactDetail = async (req, res) => {
  try {
    let objContactDetail = req.body;
    objContactDetail.phone_number_with_prefix = `${objContactDetail.phone_number_prefix}${objContactDetail.phone_number}`;
    const contactDetail = new ContactDetailModel(objContactDetail);
    const saveContactDetail = await contactDetail.save();
    res.status(201).json({
      data: saveContactDetail,
      message: "Contact updated successfully.",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a contact detail
exports.updateContactDetail = async (req, res) => {
  try {
    let _id = req.params?.id;

    if (!_id) {
      return res.status(400).json({ message: "Contact detail id is required" });
    }

    let objContactDetail = req.body;
    if (
      objContactDetail?.phone_number_prefix &&
      objContactDetail?.phone_number
    ) {
      objContactDetail[
        "phone_number_with_prefix"
      ] = `${objContactDetail.phone_number_prefix}${objContactDetail.phone_number}`;
    }

    const saveContactDetail = await ContactDetailModel.findByIdAndUpdate(
      { _id },
      objContactDetail,
      { new: false }
    );

    if (!saveContactDetail) {
      res.status(404).json({ message: "Contact detail not found" });
    } else {
      res.status(201).json({
        data: saveContactDetail,
        message: "Contact updated successfully.",
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllContactDetails = async (req, res) => {
  try {
    let limit = parseInt(req.query.limit) || 15;
    let skip = parseInt(req.query.skip) || 0;
    let searchQuery = req.query?.search?.trim() || "";

    let query = {};

    // User search by name, email, phone
    if (searchQuery) {
      if (searchQuery?.includes("+")) {
        searchQuery = new RegExp(`^\\${searchQuery}`, "gi");
      } else {
        searchQuery = new RegExp(searchQuery, "gi");
      }

      query.$or = [
        { name: searchQuery },
        { email: searchQuery },
        { phone_number_with_prefix: searchQuery },
      ];
    }

    const totalCount = await ContactDetailModel.countDocuments(query);

    const contactList = await ContactDetailModel.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);
    res.json({
      total: totalCount,
      data: contactList,
      message: "Fetch contact list successfully!",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a contact detail
exports.deleteContactDetail = async (req, res) => {
  try {
    let _id = req.params?.id;

    if (!_id) {
      return res.status(400).json({ message: "Contact detail id is required" });
    }

    const contactDetail = await ContactDetailModel.findOneAndDelete({ _id });
    if (!contactDetail) {
      res.status(404).json({ message: "Contact detail not found" });
    } else {
      res.json({ message: "Contact detail deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
