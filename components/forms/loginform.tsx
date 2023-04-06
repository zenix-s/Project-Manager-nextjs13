import React, { useState, useEffect, useCallback } from "react";

interface FormModalProps {
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  actionlabel?: string;
}

const LoginForm: React.FC<FormModalProps> = ({
  onClose,
  onSubmit,
  title,
  actionlabel,
}) => {
  return (
    <section>
      <div>
        <div>
          <h1>{title}</h1>
        </div>
        <form>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;