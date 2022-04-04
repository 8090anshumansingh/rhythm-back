import LordHuron from "../models/Lord Huron.model.js";
import HindiSongs from "../models/Best Hindi Songs.model.js";
import BestDecade from "../models/Best of the Decade For You.model.js";
import Chillout from "../models/Chillout 2021.model.js";
import Mix1 from "../models/Daily Mix 1.model.js";
import Mix3 from "../models/Daily Mix 3.model.js";
import Mix5 from "../models/Daily Mix 5.model.js";
import Himym from "../models/How I Met Your Mother Soundtrack.model.js";
import Kk from "../models/KK Radio.model.js";
import Recommends from "../models/MY COALESCE.model.js";
import Darshan from "../models/This Is Darshan Raval.model.js";
import EdSheeran from "../models/This Is Ed Sheeran.model.js";
import Twilight from "../models/Twilight.model.js";
import All from "../models/All Songs.model.js";

export const createLord = (req, res) => {
  try {
    All.create(req.body, function (data, err) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(data);
      }
    });
  } catch (e) {
    console.log(e);
  }
};


export const getAll = (req, res) => {
  try {
    All.find({}, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        {
          
          res.status(200).json(data);
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
};
export const giveId = (req, res) => {
  try {
    var j = req.body.id;
    All.find({}, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        {
          data[0].tracks.forEach((item, i) => {
            item.id = i;
          }); 
          data[0].save();
          res.status(200).send("updated");
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
};

export const getLordHuron = (req, res) => {
  try {
    LordHuron.find({}, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        {
          res.status(200).json(data);
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
};
export const getHindiSongs = (req, res) => {
  try {
    HindiSongs.find({}, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        {
          res.status(200).json(data);
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
};
export const getDecadeBest = (req, res) => {
  try {
    BestDecade.find({}, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        {
          res.status(200).json(data);
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
};
export const getYearBest = (req, res) => {
  try {
    Chillout.find({}, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        {
          res.status(200).json(data);
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
};
export const getMix1 = (req, res) => {
  try {
    Mix1.find({}, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        {
          res.status(200).json(data);
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
};
export const getMix3 = (req, res) => {
  try {
    Mix3.find({}, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        {
          res.status(200).json(data);
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
};
export const getMix5 = (req, res) => {
  try {
    Mix5.find({}, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        {
          res.status(200).json(data);
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
};
export const getHimym = (req, res) => {
  try {
    Himym.find({}, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        {
          res.status(200).json(data);
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
};
export const getKK = (req, res) => {
  try {
    Kk.find({}, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        {
          res.status(200).json(data);
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
};
export const getRecommends = (req, res) => {
  try {
    Recommends.find({}, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        {
          res.status(200).json(data);
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
};
export const getDarshan = (req, res) => {
  try {
    Darshan.find({}, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        {
          res.status(200).json(data);
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
};
export const getSheeran = (req, res) => {
  try {
    EdSheeran.find({}, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        {
          res.status(200).json(data);
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
};
export const getTwilight = (req, res) => {
  try {
    Twilight.find({}, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        {
          res.status(200).json(data);
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
};
