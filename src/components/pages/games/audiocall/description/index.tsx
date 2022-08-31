import styles from './styles.module.scss'
import ChooseButton from './button'
import { buttonsData } from '../buttons-data'

function Description() {
  return (
    <div className={styles['about-main']}>
      <div className={styles.content}>
        <h1 className={styles.title}>Игра Аудиовызов</h1>
        <h3 className={styles.subtitle}>
          Игра увеличивает словарный запас и понимание речи на слух
        </h3>
        <h3 className={styles.description}>Пожалуйста, выберите уровень сложности:</h3>
        <div className={styles['buttons-block']}>
          {buttonsData.map((el, index) => (
            <ChooseButton data={el} key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
export default Description
