import React, { Component } from 'react';

export class Buy extends Component {
	render() {
		return (
			<div className="col-md-12">
				<h2>Buy Product</h2>
				<hr />
				<div className="row">
					{ this.props.products && this.props.products.length > 0
						// Ensure id is sorted correctly by converting to Number if it's BigInt
						? this.props.products
							.sort((a, b) => {
								return Number(b.id) - Number(a.id);  // Convert to number for proper comparison
							})
							.map((product, key) => {
								// Convert price from BigInt to Ether
								const priceInEther = window.web3.utils.fromWei(product.price.toString(), 'ether');

								return (
									<div key={key} className="col-sm-4 mb-3">
										<div className="card" style={{ minHeight: '220px' }}>
											<div className="card-body">
												<div className="d-flex justify-content-between align-items-center mb-2">
													<span style={{ fontSize: '18pt' }}>{product.name}</span>
													<div className="d-flex flex-column">
														<small>Price:</small>
														{/* Display the price converted to Ether */}
														<span className="font-weight-bold" style={{ fontSize: '13pt' }}>
															{priceInEther} ETH
														</span>
													</div>
												</div>
												<hr />
												<small>{!product.purchased ? 'Owner' : 'Purchased by'}: {product.owner}</small><br />
											</div>
											<div className="card-footer" style={{ background: 'transparent', borderTop: '0px' }}>
												{ !product.purchased && product.owner !== this.props.account
													? <button 
														className="btn btn-info float-right font-weight-bold" 
														style={{ width: '75px' }}
														name={product.id}
														value={product.price}
														onClick={(event) => {
															this.props.purchaseProduct(event.target.name, event.target.value);
														}}
														>
														Buy
													</button>
													: product.owner === this.props.account 
													? <button className="btn btn-light float-right font-weight-bold" disabled style={{ minWidth: '75px' }}>Your product</button>
													: <button className="btn btn-secondary float-right font-weight-bold" disabled style={{ minWidth: '75px' }}>Purchased</button>
												}
											</div>
										</div>
									</div>
								)
							})
						: <div>Belum ada produk yang dijual.</div>
					}
				</div>
			</div>
		)
	}
}

export default Buy;
