import api from "../lib/api";
import axios, { AxiosProgressEvent } from "axios";
import toast from "react-hot-toast";

import { UploadCloud } from "lucide-react";

import { FormEvent, useEffect, useState } from "react";

import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

type ContentTypeMapping = {
  [key: string]: string[];
};

export interface FileUploadProps {
  contentType: keyof ContentTypeMapping;
  maxSize: number;
  onChange: (data: { downloadUrl: string; fileName: string }) => void;
}

export function FileUpload(props: FileUploadProps) {
  const [files, setFiles] = useState<FileList | null>(null);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isUploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);

  const contentTypeMapping: ContentTypeMapping = {
    all: ["mp4", "mp3", "mov", "gif", "jpg", "jpeg", "png", "svg", "pdf"],
    video: ["mp4", "mov", "gif"],
    image: ["jpg", "jpeg", "png", "svg"],
    pdf: ["pdf"],
  };

  const isValidFileType = (file: File): boolean => {
    const allowedExtensions = contentTypeMapping[props.contentType];
    const fileExtension = file.name.split(".").pop()?.toLowerCase() || "";

    return allowedExtensions.includes(fileExtension);
  };

  useEffect(() => {
    async function fetchSignedUrl() {
      try {
        const response = await api.post("/uploads", {
          name: files![0].name,
          contentType: files![0].type,
        });
        setSignedUrl(response.data.signedUrl);
        setDownloadUrl(response.data.downloadUrl);
      } catch (error) {
        toast.error("Error fetching signed URL!");
      }
    }

    if (files && files.length > 0 && !signedUrl) {
      fetchSignedUrl();
    }
  }, [files, signedUrl]);

  async function handleUploadFile(e: FormEvent) {
    e.preventDefault();

    if (!files || files.length === 0) {
      return;
    }

    if (!isValidFileType(files[0])) {
      toast.error(
        `Invalid file type, allowed types: ${contentTypeMapping[
          props.contentType
        ].join(", ")}`
      );
      return;
    }

    if (!signedUrl) {
      toast.error("Signed URL not available.");
      return;
    }

    const file = files[0];
    const fileName = file.name.slice(0, file.name.lastIndexOf("."));
    const fileInMB = file.size / 1024 / 1024;

    if (fileInMB > props.maxSize) {
      toast.error(`File size exceeds the maximum limit of ${props.maxSize}MB.`);
      return;
    }

    try {
      setUploading(true);

      await axios.put(signedUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 100)
          );
          setProgress(percentCompleted);
        },
      });

      if (!downloadUrl) {
        toast.error("Download URL not available.");
        return;
      }

      toast.success("File uploaded successfully!");
      props.onChange({ downloadUrl, fileName });
    } catch (error) {
      toast.error(`Error uploading file: ${error}!`);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  }

  const handleDragEnter = (e: FormEvent) => {
    e.preventDefault();
  };
  const handleDragLeave = (e: FormEvent) => {
    e.preventDefault();
  };
  const handleDragOver = (e: FormEvent) => {
    e.preventDefault();
  };
  const handleDrop = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault();

    const droppedFiles = e.dataTransfer.files;

    if (droppedFiles.length > 0) {
      setFiles(droppedFiles);
      handleUploadFile(e);
    }
  };

  return (
    <div className="w-full mx-auto">
      <div className="flex items-center justify-center w-full">
        <form
          className="w-full h-full"
          onSubmit={handleUploadFile}
          onDrop={(e) => handleDrop(e)}
          onDragOver={(e) => handleDragOver(e)}
          onDragEnter={(e) => handleDragEnter(e)}
          onDragLeave={(e) => handleDragLeave(e)}
        >
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <UploadCloud className="w-12 h-12 text-muted-foreground" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="uppercase text-xs text-gray-500 dark:text-gray-400">
                {contentTypeMapping[props.contentType].join(", ")} (
                {props.maxSize}MB)
              </p>
            </div>
            <input
              type="file"
              className="hidden h-full w-full"
              onChange={(e) => setFiles(e.target.files)}
            />
            {files && files.length > 0 && !isUploading && (
              <Button
                type="submit"
                className="bg-sky-700 w-[20%] h-8.5"
                disabled={isUploading}
              >
                Upload
              </Button>
            )}
            {isUploading && (
              <Progress className="w-[50%] h-2" value={progress} />
            )}
          </label>
        </form>
      </div>
    </div>
  );
}
