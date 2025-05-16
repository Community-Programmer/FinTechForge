import React, { useRef, useState } from "react";
import { User, ImageUp, Save,Mail, PencilLine } from "lucide-react";

const Profile: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Profile:", formData);
    console.log("Avatar File:", avatarFile);

    // Backend integration code
  };

  return (
    <div className=" flex justify-center items-center bg-gray-50 dark:bg-[#121212] p-6">
      <div className="max-w-4xl w-full bg-white dark:bg-[#1e1e1e] rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-10">
        <h2 className="text-4xl font-mdeium text-center mb-12 text-gray-900 dark:text-white">
          Your Profile
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start"
        >
          {/* Avatar Section */}
          <div className="relative flex flex-col items-center">
            <div className="w-36 h-36 rounded-full ring-2 ring-black shadow-lg overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center relative">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar Preview"
                  className="object-cover w-full h-full"
                />
              ) : (
                <User className="w-20 h-20 text-gray-400 dark:text-gray-400" />
              )}

              {/* Edit button */}
              <button
                type="button"
                onClick={handleEditClick}
                className="absolute z-10 bottom-1 right-4 bg-white dark:bg-gray-800 p-1 rounded-full shadow-md hover:bg-black hover:text-white transition-colors cursor-pointer"
                aria-label="Upload Avatar"
                title="Change Avatar"
              >
                <ImageUp className="w-6 h-6" />
              </button>
            </div>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Form fields */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="flex items-center bg-white dark:bg-[#2c2c2c] border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-gray-600 transition">
            <User className="w-5 h-5 text-gray-400 dark:text-gray-300 mr-3" />
            <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-transparent outline-none text-black dark:text-white placeholder-gray-400"
                required
            />
            </div>

            <div className="flex items-center bg-white dark:bg-[#2c2c2c] border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-gray-600 transition">
            <Mail className="w-5 h-5 text-gray-400 dark:text-gray-300 mr-3" />
            <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400"
                required
            />
            </div>

            <div className="flex bg-white dark:bg-[#2c2c2c] border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-gray-600 transition">
            <PencilLine className="w-5 h-5 text-gray-400 dark:text-gray-300 mt-1 mr-3" />
            <textarea
                name="bio"
                placeholder="Add bio ...."
                value={formData.bio}
                onChange={handleInputChange}
                rows={5}
                className="w-full bg-transparent outline-none resize-none text-gray-900 dark:text-white placeholder-gray-400"
            />
            </div>


            {/* Submit Button */}
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="flex items-center gap-3 bg-blue-600 cursor-pointer hover:bg-blue-700 transition-colors text-white px-6 py-3 rounded-lg font-semibold shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400"
              >
                <Save className="w-5 h-5" />
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
