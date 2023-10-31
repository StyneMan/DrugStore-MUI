import syringe from '../assets/images/syringe.svg'
import fluid from "../assets/images/fluid.svg"
import pill from "../assets/images/pill.svg"
import accessible from "../assets/images/accessible.svg"

export interface CategoryModel {
    title: string;
    count: number;
    icon: string;
    bgcolor: string;
    color: string;
}

const tempCategories: CategoryModel[] = [
    {title: 'Anti-Biotics', count: 25, bgcolor: '#CCE4F2', icon: syringe, color: '#0C2B6A'},
    {title: 'Anti-Malaria', count: 25, bgcolor: '#8DC2E5', icon: pill, color: '#0C2B6A'},
    {title: 'Antipyretics', count: 25, bgcolor: '#0F408A', icon: accessible, color: '#ffffff'},
    {title: 'Analgesics', count: 25, bgcolor: '#0B1841', icon: fluid, color: 'white'},
    {title: 'Antiseptics', count: 25, bgcolor: '#0B1841', icon: fluid, color: '#ffffff'},
    {title: 'Diabetes', count: 25, bgcolor: '#0F408A', icon: accessible, color: '#ffffff'} ,
    {title: 'Hypertension', count: 25, bgcolor: '#8DC2E5', icon: pill, color: '#0C2B6A'},
    {title: 'Malaria', count: 25, bgcolor: '#CCE4F2', icon: syringe, color: '#0C2B6A'},
    {title: 'Antipyretics', count: 25, bgcolor: '#0F408A', icon: accessible, color: '#ffffff'},
    {title: 'Analgesics', count: 25, bgcolor: '#0B1841', icon: fluid, color: 'white'},
    {title: 'Antiseptics', count: 25, bgcolor: '#0B1841', icon: fluid, color: '#ffffff'},
    {title: 'Diabetes', count: 25, bgcolor: '#0F408A', icon: accessible, color: '#ffffff'} ,

]

export default tempCategories;