export function uploadFile(file:any){
  const formData = new FormData();
    formData.append('file', file);
 
    return $fetch('http://localhost:8000/api/v1/upload_file', {
            method: 'POST',
            body: formData,
           
          });
}