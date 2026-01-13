'use client';

import { Button, Card, Form, InputNumber } from 'antd';

import ForSave from '@/components/ForSave';
import TestForMobX from '@/components/TestForMobX';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div>
      <h1 className={styles.title}>Slamarica</h1>
      <ForSave />
      <p>ispod ide test</p>
      <TestForMobX />
      <p>iznad ide test</p>
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
