import React, { useEffect, useRef, useState } from "react";
import { useAlbumContext } from "../util/Album";
import { CgClose } from "react-icons/cg";

const Edit = () => {
  const editRef = useRef();
  const { edit, updatingPlaylist, data, publicData, playlist } =
    useAlbumContext();
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
    return () => {
      if (editRef?.current)
        editRef.current.removeEventListener("change", upload);
    };
  }, []);
  return (
    <div className="edit-container">
      <div className="edit-box">
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            console.log(playlist);
            if (
              playlist.find(({ name: n }) => {
                return n == name;
              })
            ) {
              return new Error("same name");
            }
            // publicData({
            //   image: image || data.image,
            //   name: name || data.name,
            //   description: description || data.description,
            // });
            updatingPlaylist(playlist, {
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
          <h2 className="edit-title">Edit Details</h2>
          <div className="edit-row">
            <input ref={editRef} type="file" className="file" />

            <div className="column">
              <input
                className="input"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                cols="50"
              />
            </div>
          </div>

          <button type="submit" class="submit">
            Save
          </button>
          <CgClose className="close" onClick={edit} />
          <img src={image} alt="" />
        </form>
      </div>
    </div>
  );
};
export default Edit;
