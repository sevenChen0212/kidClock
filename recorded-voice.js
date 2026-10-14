// Locally packaged TTSMaker / 雅婷 (1601) recordings; no runtime API needed.
let recordedVoice=null;
function stopRecordedVoice(){if(recordedVoice){recordedVoice.pause();recordedVoice.currentTime=0;recordedVoice=null}}
const deviceVoiceFeedback=speakFeedback;
speakFeedback=function(correct){
  if(!voiceOn)return;
  stopRecordedVoice();stopMoodSound();
  if(window.speechSynthesis)window.speechSynthesis.cancel();
  $('voiceStatus').textContent='';
  playMoodSound(correct);
  const path=correct?(Math.random()<0.5?'audio/correct-yuxuan.mp3':'audio/correct-next.mp3'):'audio/incorrect.mp3';
  const voice=new Audio(path);recordedVoice=voice;voice.volume=1;
  voice.play().catch(()=>{if(recordedVoice===voice&&voiceOn){recordedVoice=null;deviceVoiceFeedback(correct)}});
};
const toggleDeviceVoice=$('voice').onclick;
$('voice').onclick=function(){toggleDeviceVoice();if(!voiceOn)stopRecordedVoice()};
const nextRecordedQuestion=newQuestion;
newQuestion=function(){stopRecordedVoice();stopMoodSound();if(window.speechSynthesis)window.speechSynthesis.cancel();nextRecordedQuestion()};
$('next').onclick=newQuestion;$('difficulty').onchange=newQuestion;
