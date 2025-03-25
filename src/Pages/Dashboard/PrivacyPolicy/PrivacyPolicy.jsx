import React, { useRef, useState, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import {
  useCreatePrivacyPolicyMutation,
  useGetPrivacyPolicyQuery,
} from "../../../redux/apiSlices/privacyPolicySlice";
import toast from "react-hot-toast";

function PrivacyPolicy() {
  const editor = useRef(null);
  const { data, isLoading } = useGetPrivacyPolicyQuery();
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
      toolbarSticky: false,
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
      observer: { timeout: 100 },
    }),
    []
  );

  // handle update content
  const [updateContent] = useCreatePrivacyPolicyMutation();

  const handleSave = async () => {
    toast.loading("Updating...", { id: "updatePrivacyPolicyToast" });
    try {
      const res = await updateContent({ payload: { content } }).unwrap();
      if (res.success) {
        toast.success(res.message || "Updated successfully", {
          id: "updatePrivacyPolicyToast",
        });
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update", {
        id: "updatePrivacyPolicyToast",
      });
      console.log(error?.data);
    }
  };

  return (
    <>
      <div className="w-full p-10">
        <h1 className="text-[20px] font-medium">Privacy Policy</h1>
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

export default React.memo(PrivacyPolicy);
