import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { CategoryType, UpdateCategoryType } from "../utils/types";

interface UpdateCategoryModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (categoryData: UpdateCategoryType) => Promise<void>;
  category?: CategoryType;
}

const UpdateCategoryModal: React.FC<UpdateCategoryModalProps> = ({
  open,
  onClose,
  onSubmit,
  category,
}) => {
  const [name, setName] = useState(category?.name);
  const [description, setDescription] = useState(category?.description);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (name) if (!name.trim()) return;
    setIsSubmitting(true);
    if (category && name && description) {
      try {
        await onSubmit({ id: category?.id, name, description });
      } catch (err) {
        console.error(err);
      } finally {
        setIsSubmitting(false);
      }
    }
    setName("");
    setDescription("");
    onClose();
  };

  if (name && description) {
    return (
      <Dialog
        open={open}
        onClose={isSubmitting ? undefined : onClose}
        maxWidth="sm"
        fullWidth
        closeAfterTransition={false}
      >
        <DialogTitle className="bg-gray-50 p-6">
          <p className="text-xl font-semibold text-gray-800">
            Update Category Details
          </p>
        </DialogTitle>

        <DialogContent className="p-6 flex flex-col gap-5">
          <TextField
            fullWidth
            label="Category Name"
            variant="filled"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4"
          />

          <TextField
            fullWidth
            label="Description"
            variant="filled"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>

        <DialogActions className="bg-gray-50 px-6 py-4">
          <Button
            onClick={onClose}
            className="text-gray-600 hover:bg-gray-100 px-4 py-2 rounded"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!name.trim() || !description.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
            variant="contained"
          >
            Update Category
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
};

export default UpdateCategoryModal;
