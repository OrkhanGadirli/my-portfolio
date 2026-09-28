export const agents = [
  { name: 'Kodçu', image: 'coder', walkImage: 'coder-walk', task: 'Kod yazır', detail: 'Yeni ideyaları işlək hissələrə çevirir.', family: 'claude' },
  { name: 'Bələdçi', image: 'guide', task: 'Zəng edir', detail: 'Komandanın suallarını cavablandırır.', family: 'claude' },
  { name: 'Araşdırmaçı', image: 'researcher', task: 'Qeydlər aparır', detail: 'Maraqlı fikirləri tapıb dəftərinə yazır.', family: 'claude' },
  { name: 'Rəssam', image: 'artist', task: 'Rəng seçir', detail: 'Səhnəyə yeni rənglər və formalar gətirir.', family: 'claude' },
  { name: 'Elçi', image: 'messenger', task: 'Məktub daşıyır', detail: 'Xəbərləri bir iş masasından o birinə aparır.', family: 'claude' },
  { name: 'Bağban', image: 'gardener', task: 'Gülə baxır', detail: 'Emalatxananın balaca bitkilərinə qulluq edir.', family: 'claude' },
  { name: 'Fikir', image: 'gpt-spark', task: 'İdeya tapır', detail: 'ChatGPT üçün düşündüyüm nanə rəngli ideya köməkçisidir.', family: 'gpt' },
  { name: 'Yoxlayıcı', image: 'gpt-scout', task: 'Yoxlayır', detail: 'ChatGPT üçün düşündüyüm firuzəyi yoxlama köməkçisidir.', family: 'gpt' },
]

export function characterMarkup(agent) {
  const portrait = `${import.meta.env.BASE_URL}mascots/${agent.image}.webp`
  const walking = `${import.meta.env.BASE_URL}mascots/${agent.walkImage || agent.image}.webp`
  return `
    <span class="character" data-family="${agent.family}">
      <span class="character-shadow" aria-hidden="true"></span>
      <img class="character-still" src="${portrait}" alt="" draggable="false" />
      <span class="character-walk" aria-hidden="true">
        <img class="walk-leg walk-leg-left" src="${walking}" alt="" draggable="false" />
        <img class="walk-leg walk-leg-right" src="${walking}" alt="" draggable="false" />
        <img class="walk-core" src="${walking}" alt="" draggable="false" />
      </span>
    </span>`
}
