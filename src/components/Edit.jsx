import React, { useEffect, useRef, useState } from "react";
import { useAlbumContext } from "../util/Album";
const Edit = () => {
  const editRef = useRef();
  const { edit, updatingPlaylist, data, publicData } = useAlbumContext();
  /*
    get image get name get description if its not empty

  */
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    const upload = editRef.current.addEventListener("change", () => {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImage(reader.result);
      });
      if (editRef?.current?.files[0]) {
        reader.readAsDataURL(editRef.current.files[0]);
      }
    });
    () => {
      upload.removeEventListener("change", upload);
    };
  }, []);
  return (
    <div className="edit-container">
      <div className="edit-box">
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            // publicData({
            //   image: image || data.image,
            //   name: name || data.name,
            //   description: description || data.description,
            // });
            updatingPlaylist({
              image: image || data.image,
              name: name || data.name,
              description: description || data.description,
            });
            publicData({
              image: image || data.image,
              name: name || data.name,
              description: description || data.description,
            });
            edit();
          }}
        >
          <input ref={editRef} type="file" />
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
          />
          <button type="submit">submit</button>

          <img src={image} height="50px" alt="" />
        </form>
      </div>
    </div>
  );
};
export default Edit;
