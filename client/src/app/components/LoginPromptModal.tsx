import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

interface LoginPromptModalProps {
  open: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const LoginPromptModal = ({
  open,
  onClose,
  onLogin,
}: LoginPromptModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="login-prompt-title"
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle id="login-prompt-title" sx={{ textAlign: "center", pt: 3 }}>
        Login Required
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ textAlign: "center", mb: 2 }}>
          You need to log in first to access the cart.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 3, px: 3, gap: 2 }}>
        <Button variant="outlined" onClick={onClose} sx={{ minWidth: 120 }}>
          Keep Browsing
        </Button>
        <Button
          variant="contained"
          onClick={onLogin}
          color="primary"
          sx={{ minWidth: 120 }}
        >
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginPromptModal;
