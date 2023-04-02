import { createClient } from '@supabase/supabase-js';

const options = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
};

const supabase = createClient(
  'https://whxzwzygchkrewfgwvlk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndoeHp3enlnY2hrcmV3Zmd3dmxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAzNzcxMjMsImV4cCI6MTk5NTk1MzEyM30.TmqorGinM7xlJANPbgzYAZn-RkyOaUvpG8_MYQV9BH8'
);

export { supabase };
