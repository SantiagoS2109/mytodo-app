import Input from "../ui/Input";
import Button from "../ui/Button";
import { useDispatch } from "react-redux";
import { addCategory, toggleCategoryModal } from "./categoriesSlice";
import { useState } from "react";
import { Smiley } from "@phosphor-icons/react";
import Picker from "emoji-picker-react";

function ModalNuevaCategoria() {
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState("");
  const [emoji, setEmoji] = useState("");

  const [showPicker, setShowPicker] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (!categoryName) return;

    console.log(categoryName, emoji);

    dispatch(addCategory(categoryName, emoji));
    dispatch(toggleCategoryModal());

    setEmoji("");
    setCategoryName("");
  }

  const onEmojiClick = (event) => {
    setEmoji(event.emoji);
    setShowPicker(false);
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-200/20 p-4 backdrop-blur-sm">
      <div className="relative flex h-fit w-96 flex-col justify-center rounded-lg bg-white p-6 shadow-lg">
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

            <div
              className="cursor-pointer"
              alt="emoji"
              onClick={() => setShowPicker((show) => !show)}
            >
              <Smiley weight="bold" size={32} color="#1D6D81" />
            </div>
          </div>

          {showPicker && (
            <Picker
              pickerStyle={{ width: "100%" }}
              // onEmojiClick={onEmojiClick}
              className="my-2"
              emojiStyle="native"
              height={300}
              width={300}
              // searchDisabled={true}
              previewConfig={{ showPreview: false }}
              onEmojiClick={onEmojiClick}
            />
          )}

          <Button style="mt-4 bg-primary text-white font-medium text-xl px-6 py-3 outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all duration-300 ring-offset-2 rounded-xl hover:bg-primary-darker">
            Enviar
          </Button>
        </form>
        <button
          onClick={() => dispatch(toggleCategoryModal())}
          className="absolute right-6 top-6"
        >
          X
        </button>
      </div>
    </div>
  );
}

export default ModalNuevaCategoria;
