document.getElementById('start').onclick = function() {
  const training_time = document.getElementById('training')
  const interval_time = document.getElementById('interval')
  const cycle_count = document.getElementById('cycle')
  time_system(training_time.value * 1000, interval_time.value * 1000, cycle_count.value)
  
};

function time_system(time1, time2, count) {
  const totalTime = (time1 + time2) * count　+ 1//（トレーニング＋インターバル）＊周回数でかかる時間
  let situation = 0 //0のときトレーニング　1のときインターバル
  let oldTime = Date.now() //全体の時間管理
  let trainOldTime = oldTime //トレーニングの旧時間
  let interOldTime　//インターバルの旧時間
  const timerId = setInterval( () => {
    const currentTime = Date.now()　//現在の時間
    const diff = currentTime - oldTime　//
    const remainMSec = totalTime - diff
    const remainSec = Math.ceil( remainMSec / 1000 )
    let label
    if( situation === 0 ) {
      const trainCurrentTime = Date.now()
      const trainDiff = trainCurrentTime - trainOldTime
      const trainRemainMSec = time1 - trainDiff + 10
      const trainRemainSec = Math.ceil( trainRemainMSec / 1000 )
      label = trainRemainSec
      console.log(trainDiff)
    }
    else {
      const interCurrentTime = Date.now()
      const interDiff = interCurrentTime - interOldTime
      const interRemainMSec = time2 - interDiff + 10
      const interRemainSec = Math.ceil( interRemainMSec / 1000 )
      label = interRemainSec
      console.log(interDiff)
    }
    if( label === 1 ) {
      if( situation === 0 ) {
        situation = 1
        interOldTime = Date.now()
      }
      else {
        situation = 0
        trainOldTime = Date.now()
      }
    }
    if( remainMSec <= 0 ) {
      label = 'Finish'
      clearInterval(timerId)
    }
    
    document.getElementById('timer').innerHTML = label
  }, 1000)
}
