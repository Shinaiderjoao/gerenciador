import { supabase } from '../config/supabase';
import { Part } from '../types';

export const uploadImage = async (imageFile: string) => {
  try {
    // Gera um nome único para o arquivo
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
    
    // Converte base64 para blob
    const blob = await fetch(imageFile).then(res => res.blob());
    
    // Upload para o storage do Supabase
    const { data, error } = await supabase
      .storage
      .from('parts-images')
      .upload(fileName, blob, {
        contentType: 'image/jpeg',
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Erro no upload:', error);
      throw error;
    }

    // Gera URL pública da imagem
    const { data: { publicUrl } } = supabase
      .storage
      .from('parts-images')
      .getPublicUrl(fileName);

    console.log('URL da imagem:', publicUrl); // Debug
    return publicUrl;
  } catch (error) {
    console.error('Erro ao fazer upload da imagem:', error);
    throw error;
  }
};

export const savePart = async (part: Omit<Part, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    let imageUrl = part.image_url;
    
    if (imageUrl && imageUrl.startsWith('data:image')) {
      console.log('Iniciando upload da imagem...'); // Debug
      imageUrl = await uploadImage(imageUrl);
      console.log('Upload concluído, URL:', imageUrl); // Debug
    }

    const { data, error } = await supabase
      .from('parts')
      .insert([{
        ...part,
        image_url: imageUrl,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Erro ao salvar peça:', error);
      throw error;
    }

    console.log('Peça salva:', data); // Debug
    return data;
  } catch (error) {
    console.error('Erro ao salvar peça:', error);
    throw error;
  }
};

export const updatePart = async (id: string, part: Partial<Part>) => {
  const { data, error } = await supabase
    .from('parts')
    .update(part)
    .eq('id', id)
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

export const deletePart = async (id: string) => {
  const { error } = await supabase
    .from('parts')
    .delete()
    .eq('id', id);
    
  if (error) throw error;
};

export const getParts = async () => {
  const { data, error } = await supabase
    .from('parts')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Erro ao buscar peças:', error); // Debug
    throw error;
  }

  console.log('Peças carregadas:', data); // Debug
  return data;
}; 