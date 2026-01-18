import TextLangComp from '@/components/TextLangComp';
import styles from './page.module.scss';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div>
      <h1 className={styles.title}>Slamarica</h1>
      <p>
        ispod ide test Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Nostrum quaerat odio voluptatibus nobis. Sunt, corrupti rem. Libero
        facilis vitae rem voluptates velit fugiat earum quam atque totam
        consequuntur. At, voluptas.
      </p>
      <p>iznad ide test</p>
      <p>
        ispod ide jos jedan test Lorem ipsum dolor sit amet consectetur,
        adipisicing elit. Quaerat deleniti quam ab magnam eos, possimus saepe
        deserunt quae repellat soluta ullam, cum consequatur tempore minima.
        Reprehenderit magni neque numquam cumque.
      </p>
      <p>iznad je test pool</p> *
      <TextLangComp locale={locale} />
    </div>
  );
}
