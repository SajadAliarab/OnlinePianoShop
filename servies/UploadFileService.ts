export function uploadFile(file:any){
    return $fetch('http://localhost:8000/api/v1/upload_file', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: {
                file
            },
          });
}