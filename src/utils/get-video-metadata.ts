export async function getVideoMetadata(file: File): Promise<{ preview: string; duration: string }> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.src = URL.createObjectURL(file);
      video.muted = true;

      video.onloadedmetadata = () => {
        const seconds = Math.floor(video.duration);

        video.currentTime = 10; 

        video.onseeked = () => {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const preview = canvas.toDataURL('image/jpeg');
            URL.revokeObjectURL(video.src);

            resolve({ preview, duration: String(seconds) });
          }
        };
      };

      video.onerror = () => reject('Erro ao processar vídeo');
    });
  }