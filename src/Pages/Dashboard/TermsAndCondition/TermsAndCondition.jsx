import React, { useRef, useState, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import {
  useCreateTermsAndConditionsMutation,
  useGetTermsAndConditionQuery,
} from "../../../redux/apiSlices/termsAndConditionSlice";
import toast from "react-hot-toast";

function TermsAndCondition() {
  const editor = useRef(null);
  const { data, isLoading } = useGetTermsAndConditionQuery();
  const contentData = data?.content;

  const [content, setContent] = useState(contentData);

  useEffect(() => {
    setContent(contentData);
  }, [isLoading]);

  const config = useMemo(
    () => ({
      theme: "default",
      showCharsCounter: false,
      showWordsCounter: false,
      toolbarAdaptive: true,
      toolbarSticky: false, // Disabled sticky toolbar for better performance
      enableDragAndDropFileToEditor: false,
      allowResizeX: false,
      allowResizeY: false,
      statusbar: false,
      buttons: [
        "source",
        "|",
        "bold",
        "italic",
        "underline",
        "|",
        "ul",
        "ol",
        "|",
        "font",
        "fontsize",
        "brush",
        "paragraph",
        "|",
        "image",
        "table",
        "link",
        "|",
        "left",
        "center",
        "right",
        "justify",
        "|",
        "undo",
        "redo",
        "|",
        "hr",
        "eraser",
        "fullsize",
      ],
      useSearch: false,
      spellcheck: false,
      iframe: false,
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      toolbarButtonSize: "small",
      readonly: false,
      observer: { timeout: 100 }, // Reduces observer updates
    }),
    []
  );

  // handle update content
  const [updateContent] = useCreateTermsAndConditionsMutation();

  const handleSave = async () => {
    toast.loading("Updating...", { id: "updateTermsConditionToast" });
    try {
      const res = await updateContent({ payload: { content } }).unwrap();
      if (res.success) {
        toast.success(res.message || "Updated successfully", {
          id: "updateTermsConditionToast",
        });
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update", {
        id: "updateTermsConditionToast",
      });
      console.log(error?.data);
    }
  };

  return (
    <>
      <div className="w-full p-10">
        <h1 className="text-[20px] font-medium">Terms And Condition</h1>
        <div className="w-5/5 bg-black">
          <JoditEditor
            className="my-5 bg-red-300"
            ref={editor}
            value={content}
            onChange={(newContent) => setContent(newContent)}
            config={config}
          />
        </div>
        <div className="flex items-center justify-end">
          <button
            className="bg-gtdandy text-[16px] text-white px-10 py-2.5 mt-5 rounded-md"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default React.memo(TermsAndCondition);
