export type ParseTranscription = {
  startTime: string
  fullTime: string
  text: string
}

export function parseTranscription(vtt: string): ParseTranscription[] {
    const blocks = vtt.replace('WEBVTT', '').trim().split(/\n\s*\n/);

    return blocks.map((block) => {
      const lines = block.split('\n');
      const timeRange = lines[0]; // Ex: 00:00:10.098 --> 00:00:16.003
      const text = lines.slice(1).join(' ');

      // Extrai apenas o início (00:00:10) para exibição simplificada
      const startTime = timeRange.split(' --> ')[0].split('.')[0];

      return {
        startTime,
        fullTime: timeRange,
        text,
      };
    });
  }