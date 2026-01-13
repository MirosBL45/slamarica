'use client';

import { Button, Card, Form, InputNumber } from 'antd';

import ForSave from '@/components/ForSave';
import TestForMobX from '@/components/TestForMobX';
import TestPools from '@/components/TestPools';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div>
      <h1 className={styles.title}>Slamarica</h1>
      <ForSave />
      <p>
        ispod ide test Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Nostrum quaerat odio voluptatibus nobis. Sunt, corrupti rem. Libero
        facilis vitae rem voluptates velit fugiat earum quam atque totam
        consequuntur. At, voluptas.
      </p>
      <TestForMobX />
      <p>iznad ide test</p>
      <p>
        ispod ide jos jedan test Lorem ipsum dolor sit amet consectetur,
        adipisicing elit. Quaerat deleniti quam ab magnam eos, possimus saepe
        deserunt quae repellat soluta ullam, cum consequatur tempore minima.
        Reprehenderit magni neque numquam cumque.
      </p>
      <TestPools />
      <p>iznad je test pool</p>
      <section>
        <Card style={{ maxWidth: 400, margin: '2rem auto' }}>
          <Form layout="vertical">
            <Form.Item label="Plata">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Button type="primary" block>
              Potvrdi
            </Button>
          </Form>
        </Card>
      </section>
    </div>
  );
}
