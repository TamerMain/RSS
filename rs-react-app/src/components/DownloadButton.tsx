import { useTranslations } from 'next-intl';
import { type CardInfo } from '@/store/cartSlice';
import { NAVIGATION, SEARCH_PARAMS } from '@/constants/routes';

function detailsURL(search: string, page: number, id: string) {
  const origin = window.location.origin;
  const URL = `${origin}${NAVIGATION.SEARCH.CARDS}?${SEARCH_PARAMS.QUERY}=${search}&${SEARCH_PARAMS.PAGE}=${page}&${SEARCH_PARAMS.DETAILS}=${id}`;
  return URL;
}

function DownloadButton(props: { cart: CardInfo[] }) {
  const t = useTranslations('Cart');
  
  function handleDownload() {
    if (props.cart.length === 0) return;
    const contentHeader =
      'This file contains your selected card information.\r\nSuch as Name, ID and Description link to original art and details URL which is not impelemented yet for direct access from browser.\r\n\r\n';
    const contentBody = props.cart
      .map((item, index) => {
        return `------- Card ${index + 1} -------\r\nName: ${item.name}\r\nScryfall unique ID: ${item.id}\r\nOriginal Art: ${item.imageSrc ? item.imageSrc : 'No art available'}\r\nDetails URL: ${detailsURL(item.search, item.page, item.id)}.\r\n`;
      })
      .join('\r\n');
    const content = `${contentHeader + contentBody}`;
    const blob = new Blob([content], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${props.cart.length}_cards_selected.csv`;
    a.click();

    URL.revokeObjectURL(url);
  }
  return (
    <button
      className="p-2  bg-mist-800 hover:text-gray-50 cursor-pointer transition-colors duration-400"
      onClick={handleDownload}
    >
      {t('download')}
    </button>
  );
}

export default DownloadButton;
