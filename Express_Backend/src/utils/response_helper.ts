export function ErrorResponseStructure(error_message: string): {} {
  return { status: "error", message: error_message };
}

export function SuccessResponseStructure(data_to_be_sent: {}) {
  return {
    status: "success",
    data: { ...data_to_be_sent },
  };
}
