package com.f3pro.dsvendas.controllers;

import com.f3pro.dsvendas.dto.SaleDTO;
import com.f3pro.dsvendas.dto.SaleSuccessDTO;
import com.f3pro.dsvendas.dto.SaleSumDTO;
import com.f3pro.dsvendas.dto.SellerDTO;
import com.f3pro.dsvendas.repositories.SaleRepository;
import com.f3pro.dsvendas.services.SaleService;
import com.f3pro.dsvendas.services.SellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/sales")
public class SaleController {

	@Autowired
	private SaleService service;

	@GetMapping
	public ResponseEntity<Page<SaleDTO>> findAll(Pageable pageable) {
		Page<SaleDTO> list = service.findAll(pageable);
		return ResponseEntity.ok(list);
	}
	@GetMapping(value = "/amount-by-saller")
	public ResponseEntity<List<SaleSumDTO>> amountGrupedBySeller( ) {
		List<SaleSumDTO> list = service.amountGrupedBySeller();
		return ResponseEntity.ok(list);
	}

	@GetMapping(value = "/success-by-saller")
	public ResponseEntity<List<SaleSuccessDTO>> successGrupedBySeller( ) {
		List<SaleSuccessDTO> list = service.successGrupedBySeller();
		return ResponseEntity.ok(list);
	}
}
