import React from "react";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Success(msg) {
  toast.success(
    <p className="text-white tx-16 mb-0">
      Success: {msg}
    </p>,
    {
      position: toast.POSITION.TOP_RIGHT,
      hideProgressBar: true,
      autoClose: 2000,
      theme: "colored",
    }
  );
}

export function Secondary(msg) {
    toast.error(
      <p className="text-white tx-16 mb-0">Oops! {msg}</p>,
      {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        autoClose: 2000,
        theme: "colored",
      }
    );
}

export function LeftNotifier(msg) {
    toast.warn(
      <p className="text-white tx-16 mb-0">Warning: {msg}</p>,
      {
        position: toast.POSITION.TOP_LEFT,
        hideProgressBar: true,
        autoClose: 2000,
        theme: "colored",
      }
    );
}

export function CenterInfo(msg) {
    toast.info(<p className="text-white tx-16 mb-0">Info: {msg}</p>, {
      position: toast.POSITION.TOP_CENTER,
      hideProgressBar: true,
      autoClose: 2000,
      theme: "colored",
    });
}

export const CenterDanger = (msg) => {
  toast.error(<p className="text-white tx-16 mb-0">Error: {msg}</p>, {
    position: toast.POSITION.TOP_CENTER,
    hideProgressBar: true,
    autoClose: 2000,
    theme: "colored",
  });
};

export function Centerwarning(msg) {
    toast.warn(<p className="text-white tx-16 mb-0">{msg}</p>, {
      position: toast.POSITION.TOP_CENTER,
      hideProgressBar: true,
      autoClose: 2000,
      theme: "colored",
    });
}

// Side Alerts Notifications

export function SuccessLeft(msg) {
    toast.success(
      <p className="text-white tx-16 mb-0">
        <h3>Notice!</h3>{msg}
      </p>,
      {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
        autoClose: 2000,
        theme: "colored",
      }
    );
}

export function WarningLeft(msg) {
    toast.warn(
      <p className="text-white tx-16 mb-0">
        <h3>Warning!</h3>{msg}
      </p>,
      {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
        autoClose: 2000,
        theme: "colored",
      }
    );
}

export function DangerRight(msg) {
  toast.error(
    <p className="text-white tx-16 mb-0">
      {msg}
    </p>,
    {
      position: toast.POSITION.TOP_RIGHT,
      hideProgressBar: true,
      autoClose: 2000,
      theme: "colored",
    }
  );
}

// Gradient Side Alerts Notifications

export function GradientSuccess(msg) {
    toast.success(
      <p className="text-white tx-16 mb-0">
        <h3>Error!</h3>please check Your details ...file is missing
      </p>,
      {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
        autoClose: 2000,
        theme: "colored",
      }
    );
}

export function GradientWarning() {
    toast.warn(
      <p className="text-white tx-16 mb-0">
        <h3>Error!</h3>please check Your details ...file is missing
      </p>,
      {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
        autoClose: 2000,
        theme: "colored",
      }
    );

//   return (
//     <div>
//       <Button
//         className="me-2"
//         variant="warning-gradient"
//         onClick={Toastslidewarn}
//       >
//         Warning
//       </Button>
//     </div>
//   );
}

export function GradientDanger() {
    toast.error(
      <p className="text-white tx-16 mb-0">
        <h3>Error!</h3>please check Your details ...file is missing
      </p>,

      {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
        autoClose: 2000,
        theme: "colored",
      }
    );
//   return (
//     <div>
//       <Button
//         className="me-2"
//         variant="danger-gradient"
//         onClick={Toastslidewarn}
//       >
//         Danger
//       </Button>
//     </div>
//   );
}



