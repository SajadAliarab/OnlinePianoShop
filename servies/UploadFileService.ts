export function insertFile(file:any){
  const formData = new FormData();
    formData.append('file', file);
 
    return $fetch('http://localhost:8000/api/v1/upload_file', {
            method: 'POST',
            body: formData,
           
          });
}
export function deleteFile(fileName: string) {
  return $fetch(`http://localhost:8000/api/v1/delete_file/${fileName}`, {
    method: 'DELETE',
  });
}