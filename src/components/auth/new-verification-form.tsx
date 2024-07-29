"use client";

import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [sucess, setSucess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (sucess || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setError(data.error);
        setSucess(data.success);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, sucess, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center w-full justify-center text-white">
        {!sucess && !error && <BeatLoader color="white" />}
        <FormSuccess message={sucess} />
        {!sucess && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};
