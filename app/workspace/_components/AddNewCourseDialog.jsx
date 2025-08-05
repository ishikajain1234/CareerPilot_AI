"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2Icon, Sparkle } from "lucide-react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AddNewCourseDialog = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    includeVideo: false, // ✅ correct spelling
    noofChapters: 0, // ✅ correct casing and type
    category: "",
    level: "",
  });

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onGenerate = async () => {
    const courseId = uuidv4();

    try {
      setLoading(true);

      const preparedData = {
        ...formData,
        noofChapters: Number(formData.noofChapters), // ✅ ensures number
        courseId,
      };

      // Optional: Basic check before request
      if (
        !preparedData.name ||
        !preparedData.description ||
        !preparedData.level ||
        !preparedData.category ||
        isNaN(preparedData.noofChapters) ||
        preparedData.noofChapters < 1
      ) {
        toast.error("Please fill all required fields correctly.");
        setLoading(false);
        return;
      }

      const result = await axios.post("/api/generate-course-layout", preparedData);

      if (result.data.redirect) {
        toast.warning("Limit reached. Please subscribe.");
        router.push("/workspace/billing");
        return;
      }

      router.push("/workspace/edit-course/" + result.data?.courseId);
    } catch (e) {
      console.error("Error generating course layout:", e);
      toast.error("Something went wrong while generating the course.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            Create New Course using AI
          </DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col gap-5 mt-4 text-sm text-gray-600">
              <div className="flex flex-col gap-1">
                <label htmlFor="courseName" className="font-medium text-gray-700">
                  Course Name
                </label>
                <Input
                  id="courseName"
                  placeholder="e.g. Mastering React"
                  onChange={(e) => onHandleInputChange("name", e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="courseDescription" className="font-medium text-gray-700">
                  Course Description
                </label>
                <Input
                  id="courseDescription"
                  placeholder="A short summary of the course"
                  onChange={(e) => onHandleInputChange("description", e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="chapters" className="font-medium text-gray-700">
                  Number of Chapters
                </label>
                <Input
                  id="chapters"
                  placeholder="e.g. 10"
                  type="number"
                  min="1"
                  onChange={(e) =>
                    onHandleInputChange("noofChapters", Number(e.target.value))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="includeVideo" className="font-medium text-gray-700">
                  Include Video
                </label>
                <Switch
                  checked={formData.includeVideo}
                  onCheckedChange={(val) => onHandleInputChange("includeVideo", val)}
                />
              </div>

              <div>
                <label className="mb-1">Difficulty level</label>
                <Select onValueChange={(value) => onHandleInputChange("level", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Difficulty Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="advance">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="courseCategory" className="font-medium text-gray-700">
                  Category
                </label>
                <Input
                  id="courseCategory"
                  placeholder="e.g. Web Development"
                  onChange={(e) => onHandleInputChange("category", e.target.value)}
                />
              </div>

              <div>
                <Button className="w-full" onClick={onGenerate} disabled={loading}>
                  {loading ? <Loader2Icon className="animate-spin" /> : <Sparkle />}{" "}
                  Generate Course
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewCourseDialog;
