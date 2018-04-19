import { Post } from '../models/post.interface';
import { CATEGORIES } from './category.mocks';

const postList: Post[] = [
  {
    title: "ETF Watch: Newcomer Debuts 2 Funds",
    slug: "etf_watch_newcomer_debuts_2_funds",
    url: "http://www.etf.com/sections/daily-etf-watch/etf-watch-newcomer-debuts-2-funds",
    summary: "FormulaFolio Investments, a private money manager, is breaking into the ETF industry with the launch of two actively managed funds-of-funds with very different objectives. The FormulaFolios Hedged Growth ETF (FFHG) and the FormulaFolios Income ETF (FFTI) will both invest primarily in other ETFs.",
    date: 1496780100,
    sentiment: 0.04,
    image: "",
    category_id: CATEGORIES[0],
  },
  {
    title: "Intl Equity ETFs Fuel Record Year",
    slug: "intl_equity_etfs_fuel_record_year",
    url: "http://www.etf.com/sections/features-and-news/intl-equity-etfs-fuel-record-year",
    summary: "To say that inflows into U.S.-listed ETFs are at all-time highs is an understatement. Through the first five months of 2017 inflows are shattering all records?with no end in sight to the stampede into exchange-traded funds.",
    date: 1496763000,
    sentiment: 0.06,
    image: "",
    category_id: CATEGORIES[0],
  },
  {
    title: "test",
    slug: "intl_equity_etfs_fuel_record_year",
    url: "http://www.etf.com/sections/features-and-news/intl-equity-etfs-fuel-record-year",
    summary: "To say that inflows into U.S.-listed ETFs are at all-time highs is an understatement. Through the first five months of 2017 inflows are shattering all records?with no end in sight to the stampede into exchange-traded funds.",
    date: 1496763000,
    sentiment: 0.06,
    image: "",
    category_id: CATEGORIES[1],
  },
]

export const POSTS = postList;
