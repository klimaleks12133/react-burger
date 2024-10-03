import IngredientDetails from '../components/IngredientDetails/IngredientDetails';
import './Page.css';

function IngredientPage() {
    return (
        <main className="mt-20 page-container">
            <div className="page-container-inner">
                <IngredientDetails />
            </div>
        </main>
    );
}

export default IngredientPage;