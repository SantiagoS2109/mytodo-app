import { useDispatch } from "react-redux";
import { useState } from "react";
import { Smiley } from "@phosphor-icons/react";
import Picker from "emoji-picker-react";
import { CirclePicker } from "react-color";
import PropTypes from "prop-types";

import Input from "../ui/Input";
import Button from "../ui/Button";

import { addCategory } from "../../toDoSlice";

function ModalNuevaCategoria({ onCloseModal }) {
  ModalNuevaCategoria.propTypes = {
    onCloseModal: PropTypes.func,
  };

  const [categoryName, setCategoryName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [color, setColor] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();

    if (!categoryName || !color || !emoji) return;

    dispatch(addCategory(categoryName, emoji, color));
    onCloseModal();

    setEmoji("");
    setCategoryName("");
  }

  const onEmojiClick = (event) => {
    setEmoji(event.emoji);
    setShowPicker(false);
  };

  const handleColorChange = (color) => {
    setColor(color.hex);
  };

  return (
    <div className="flex w-80 flex-col justify-center">
      <h2 className="mb-4 text-3xl">Nueva Categoría</h2>
      <form className="relative flex flex-col" onSubmit={handleSubmit}>
        <Input
          value={categoryName}
          setValue={setCategoryName}
          placeholder={"Ingresa el nombre de la categoría"}
          style={"mb-4"}
        />

        <div className="flex w-full items-center justify-between gap-2">
          <Input
            isDisabled={true}
            value={emoji}
            setValue={setEmoji}
            placeholder={"Emoji"}
          />

          <Button alt="emoji" onClick={() => setShowPicker((show) => !show)}>
            <Smiley weight="bold" size={32} color="#1D6D81" />
          </Button>
        </div>

        {!showPicker && (
          <div className="itm my-4 flex justify-center">
            <CirclePicker color={color} onChange={handleColorChange} />
          </div>
        )}

        {showPicker && (
          <Picker
            pickerStyle={{ width: "100%" }}
            className="my-2"
            emojiStyle="native"
            height={300}
            width={300}
            previewConfig={{ showPreview: false }}
            onEmojiClick={onEmojiClick}
          />
        )}

        <Button className="mt-4 rounded-xl bg-primary px-6 py-3 text-xl font-medium text-white outline-none ring-offset-2 transition-all duration-300 hover:bg-primary-darker focus:ring-2 focus:ring-primary focus:ring-opacity-50">
          Enviar
        </Button>
      </form>
    </div>
  );
}

export default ModalNuevaCategoria;
