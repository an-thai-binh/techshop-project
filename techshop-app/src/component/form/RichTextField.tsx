import { useEffect, useRef } from "react";

type RichTextFieldProps = {
    value: string,
    onChange: (value: any) => void
}

export default function RichTextField({ value, onChange }: RichTextFieldProps) {
    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value ?? "";
        }
    }, [value]);

    const handleInput = () => {
        const html = editorRef.current?.innerHTML || '';
        onChange(html);
    };

    const execCommand = (command: string) => {
        document.execCommand(command, false);
        handleInput();
    };

    return (
        <div className="w-full">
            <div className="mb-2 space-x-2">
                <button
                    type="button"
                    onClick={() => execCommand('bold')}
                    className="px-2 py-1 w-8 rounded border border-[#cccccc] hover:bg-gray-100"
                >
                    <b>B</b>
                </button>
                <button
                    type="button"
                    onClick={() => execCommand('italic')}
                    className="px-2 py-1 w-8 rounded border border-[#cccccc] hover:bg-gray-100 italic"
                >
                    I
                </button>
                <button
                    type="button"
                    onClick={() => execCommand('underline')}
                    className="px-2 py-1 w-8 rounded border border-[#cccccc] hover:bg-gray-100 underline"
                >
                    U
                </button>
            </div>
            <div
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                className="min-h-[120px] p-3 rounded-[4] border border-[#cccccc] bg-white focus-visible:outline-[#2684FF]"
                style={{ whiteSpace: 'pre-wrap' }}
            />
        </div>
    );
}