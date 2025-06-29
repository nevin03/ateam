import { useFormik } from "formik";

export const useCustomForm = ({
  initialValues,
  validationSchema,
  onSubmit,
  ...rest
}) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    ...rest,
  });

  return formik;
};
