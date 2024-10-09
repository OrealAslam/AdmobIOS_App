import {get_async_data} from './src/Helper/AppHelper';
import {translation} from './locales/translation';

export const lang = async () => {
  let lang = await get_async_data('selected_lang');
  if (lang != null || lang != undefined || lang != '') {
    return returnLanguage(lang);
  } else {
    return undefined;
  }
};

const returnLanguage = (language) => {
  if (Object.keys(translation).includes(language)) {
    const selectedTranslation = translation[language];
    return selectedTranslation;
  }
};
