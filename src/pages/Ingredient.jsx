import IngredientDetails from '../components/IngredientDetails/IngredientDetails';
import './Page.css';

function IngredientPage() {
    return (
        <main className="page-container">
            <div className="page-container-inner">
                <IngredientDetails />
            </div>
        </main>
    );
}

export default IngredientPage;